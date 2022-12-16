Almanac  

You need to enable JavaScript to run this app.

## Summary

  

## Index

/

## Overview

### Project Summary

| Name | Pool Together |
| --- | --- |
| Platform | Near Protocol |
| Language | Rust |
| Codebase | https://github.com/Shard-Labs/pool-together |
| init commit | 2b5408577f457644c674bf786a2d6abf2212b59c |
| commit after fixes |  |

### Audit Summary

The audited project consists of 3 RUST smart contracts developed on the NEAR Blockchain. All contracts constitute the Tool Together DAPP which is a prize savings liquidity network.

In this audit, it is analyzed the code security, reliability and good practice techniques for RUST code development.

### Code Inventory

| Module | Contract | Content |
| --- | --- | --- |
| Common | Generic module | lib.rstypes.rs |
| Defi Borrow | defi/ft\_token | events.rslib.rs |
| Draw | draw | interfaceslib.rstest\_utils.rs |
| Pool | pool | interfacesburrow.rsexternal.rsft\_token.rslib.rspicks.rsprize.rstest\_utils.rstwab.rsutils.rs |

### Findings

| Contract | ID | Issue | Category | Severity |
| --- | --- | --- | --- | --- |
| DEFI | DEFI-1 | Use of StorageKeys | Usability | Medium |
| DEFI-2 | Transaction running out of gas | Usability | High |
| DEFI-3 | Funds deposit on transfer | Fund management | High |
| DEFI-4 | Message on FT transfer | Documentation | Informational |
| DEFI-5 | Events as a generic module | Code organization | Low |
| COMMON | COMM-1 | Test coverage | Testing | High |
| DRAW | DRAW-1 | Inefficient buffer read | Usability | High |
| DRAW-2 | Missing informational log | Documentation | Informational |
| DRAW-3 | Missing informational log | Documentation | Informational |
| POOL | POOL-1 | Use of StorageKeys | Usability | Medium |
| POOL-2 | Unused method | Documentation | Informational |
| POOL-3 | Hardcoded result | Documentation | Low |
| POOL-4 | Gas optimization | Utility | Medium |
| POOL-5 | Uncertaint depositor | Fund management | High |
| POOL-6 | Nested IF structure | Code organization | Low |
| POOL-7 | Underflow arithmetic operation | Utility | High |

## Defi-Borrow

The defi-borrow contract has a special role within this project. Its role is to help the simulation process to interact with a Borrow/Lend protocol. The Defi-Borrow contract provides withdraw functionalities for external users. Nonetheless, the contract is expandable to further functionalities that characterize a Borrow/Lend DAPP.

### Dependencies

![Untitled](https://res.cloudinary.com/almanac/image/upload/v1667811566/workspace_portal_uploads/fe2eiitftsac7ixz8fhc.png)

### Testing coverage

The results of the coverage tests are 36.84% when it comes to cargo tests.

  

### Review and issues

The code presents several warnings whether for not using a function, a variable and so on. It is highly recommended to address this issues even though it doesn't affect the contract execution.

#### init

*   \[DEFI-1\] UnorderedMap collection is not using StorageKeys enum to tag the memory storage position.
    

#### show\_reward

View function to return a list of owned tokens, balance and the rewards linked to a given account id. No issues found within the function

#### account\_farm\_claim\_all

Empty function. It is recommended to remove it.

#### execute

Function handles a finite number of actions in one call. One action can be found implemented for Withdraw a certain amount from the contract.

*   \[DEFI-2\] Due to its implementation, the function call could run out of gas on execution if the action list is too big. It is recommended to restrict the amount of executable actions that can take place in one call.
    
*   \[DEFI-3\] On Withdraw, 1 (one) yocto is used to perform the transfer, but the predecessor does not deposit any tokens. It is recommended to address this issue by providing a 1 yocto deposit and return it to the predecessor in case of an execution failure.
    

#### on\_after\_ft\_transfer

Unused callback function

#### Fungible Token Receiver

*   \[DEFI-4\] Uncertainties on what it means to receive a token with a message attached to the call or not.
    

#### Events

*   \[DEFI-5\] The events.rs solves the issue of having a generic function to emit different events. Use this module on all contracts. It can be moved to the common package and imported on all contracts.
    

## Common

The Common Cargo package must not be confused with a smart contract. Common contains the implementation of a circular buffer able to store any Rust type within.

### Test coverage

The coverage result is as high as 93,33%.

#### Review and Issues

The main properties that we can find on this circular buffer are a parameterized buffer size and the index position. One can add a new element to the buffer or read a certain position from it.

*   \[COMM-1\] This is a critical part module of the Pool Together project. As a recommendation, the testing coverage should aim for a 100% result.
    

## Draw

### Dependencies

![Untitled](https://res.cloudinary.com/almanac/image/upload/v1667811684/workspace_portal_uploads/nsnmfmyz8qbxkjiryqyr.png)

### Test Coverage

The coverage tests of Draw smart contract is 84,21%.

### Review and issues

The code presents several warnings whether for not using a function, a variable and so on. It is highly recommended to address this issues even though it doesn't affect the contract execution.

#### DrawBuffer → get\_draw

*   \[DRAW-1\] Function iterates over all elements of a buffer to return the Draw id. Depending on the buffer size, this execution consumes a lot of resources due to it's loop over all elements. It is recommended to use the get method from circular buffer which indexes the buffer in order to return its content.
    

#### DrawRegister → get\_draws

Returns a list of Draws paginated by a starting index and a limit.

#### DrawCreator → start\_draw

Initiate a draw action.

*   \[DRAW-2\] There is no clear way to inform that a draw has started or not.
    

#### DrawCreator → can\_start\_draw

Check if draw can initiate.

#### DrawCreator → can\_complete\_draw

Check if a draw can end.

#### DrawCreator → complete\_draw

Finishes a draw by generating a random u256 number and adding it to the buffer.

*   \[DRAW-3\]There is no clear way to inform that a draw has been completed or not.
    

#### DrawCreator

Regarding all the above functions, it is recommended to add event logs to inform users about the status of the draw.

## Pool

The Pool smart contract contains the main functionalities of Pool Together. On this contract, users will deposit their tokens, the yield will accumulate on the deposits and finally a reward will be randomly distributed among the winners.

### Dependencies

![Untitled](https://res.cloudinary.com/almanac/image/upload/v1667811719/workspace_portal_uploads/ujlcfxfiatfjl8ubvs6v.png)

### Test coverage

Unfortunately, the cargo test coverage tool crashes on execution. Further investigations need to take place before resolution.

### Review and Issues

The code presents several warnings whether for not using a function, a variable and so on. It is highly recommended to address this issues even though it doesn't affect the contract execution.

Currently, the event handler is not being used in all contracts. This would save a lot of code when it comes to emit events of the pool contract mainly since is the contract that interacts with the users and the most interesting for further indexing.

#### new

The new method initializes all collections and registers the predecessor among the contract token owners. Finally, an event is emit to inform users that the contract is ready to be used.

*   \[POOL-1\] Token and metadata fields are not using StorageKey to allocate the memory position. From a maintenance point of view, this makes highly difficult to keep track of all memory prefixes used on the contract and thus break the contract during future upgrades. It is highly recommended to use StorageKey prefixes to identify each contract memory field.
    

#### Fungible Token Receiver

Method handling incoming fungible tokens.

*   \[POOL-2\] Burn method is a public crate, which is not used. It is recommended to add documentation arguing this decision.
    

#### Burrow

*   \[POOL-3\] on get reward from defi, returns hard-coded value 10. It is not clear the purpose of this callback, if it is meant to be used only on simulation scenario or not.
    
*   \[POOL-4\] claim function is using maximum available gas. It is highly recommended to optimize the gas consumption.
    
*   \[POOL-5\] Uncertainty on who is paying for the transfer deposit.
    

#### Picks

Handles the picks per draw for a given account id. No issues have been found within this module.

#### Prize

The Prize module calculates, draws and prize distributions to account ids.

#### Twab

Using the user's average balance between a certain period of time, the Twab module calculates the time-weighted average balance. Thus, determine the share of the liquidity for a given period of time.

*   \[POOL-6\] on generate twab, the code presents some difficulties while reading it. A possible solution for this issue is to use Option.unwrap\_or\_else(). This would also remove the nested if structure that follows.
    
*   \[POOL-7\] even though it is virtually impossible to have a failure when it comes to the so called "last\_element.timestamp" and the current timestamp, it is recommended to check if current timestamp is greater than "last\_element.timestamp". This could lead into underflow arithmetic operation failure.
