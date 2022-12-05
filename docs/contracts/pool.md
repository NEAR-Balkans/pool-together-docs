# Pool
- [Source Code](https://github.com/Shard-Labs/pool-together/tree/main/pool/)

## View Methods

### get_asset

Returns the token id that the contract accepts

```rust
fn get_asset(&self) -> AccountId;
```

### get_reward

Returns how much reward the protocol has generated

```rust
fn get_reward(&self) -> Promise;
```

### get_deposited_amount

Returns what amount the contract has deposited

```rust
fn get_deposited_amount(&self) -> Balance;
```

### get_prize_distribution

Returns prize distribution by draw id

```rust
fn get_prize_distribution(&self, draw_id: DrawId) -> PrizeDistribution;
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| draw_id     | DrawId    | Id of the draw                                    |

## Methods

## init method
### new

Initializes the contract

```rust
fn new(
    owner_id: AccountId,
    deposited_token_id: AccountId,
    metadata: FungibleTokenMetadata,
    draw_contract: AccountId,
    burrow_address: AccountId,
    reward_token: AccountId,
    min_pick_cost: U128,
);
```
#### Parameters:

| Name               | Type                  | Description                                                        |
| ------------------ | --------------------- | ------------------------------------------------------------------ |
| owner_id           | AccountId             | Id of the owner                                                    |
| deposited_token_id | AccountId             | Id of the token that is going to be accepted only                  |
| metadata           | FungibleTokenMetadata | Metadata of the tokens that the contract is minting                |
| draw_contract      | AccountId             | Address of the draw contract                                       |
| burrow_address     | AccountId             | Address of burrow contract                                         |
| reward_token       | AccountId             | Id of the token that will be sent to users when they claim rewards |
| min_pick_cost      | U128                  | Amount of Deposited FT Tokens for each pick                        |

## init method

### new_default_meta

Initializes the contract with default Fungible token metadata

```rust
fn new_default_meta(
    owner_id: AccountId, 
    token_for_deposit: AccountId, 
    draw_contract: AccountId, 
    burrow_address: AccountId, 
    reward_token: AccountId, 
    min_pick_cost: U128
);
```
#### Parameters:

| Name               | Type      | Description                                                        |
| ------------------ | ----------| ------------------------------------------------------------------ |
| owner_id           | AccountId | Id of the owner                                                    |
| deposited_token_id | AccountId | Id of the token that is going to be accepted only                  |
| draw_contract      | AccountId | Address of the draw contract                                       |
| burrow_address     | AccountId | Address of burrow contract                                         |
| reward_token       | AccountId | Id of the token that will be sent to users when they claim rewards |
| min_pick_cost      | U128      | Amount of Deposited FT Tokens for each pick                        |

### get_picks

Returns the number of picks that the caller generates. If the returned number is 100, then the user 
have picks from 1 to 100 to claim for this draw.

```rust
fn get_picks(&self, draw_id: DrawId) -> PromiseOrValue<NumPicks>;
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| draw_id     | DrawId    | Id of the draw                                    |

### add_prize_distribution

Creates a prize distribution for a draw

```rust
fn add_prize_distribution(&mut self, draw_id: DrawId, prize_awards: U128, cardinality: u8, bit_range_size: u8);
```

#### Parameters:

| Name           | Type      | Description                                             |
| -------------- | --------- | ------------------------------------------------------- |
| id             | DrawId    | Id of the draw                                          |
| prize_awards   | U128      | Amount of FT tokens, that will be distributed as reward |
| cardinality    | u8        | Number of sub-divisions of a random number              |
| bit_range_size | u8        | The number of bits allocated to each division           |

:::note
Requirements:
- caller account can only be owner account
- cardinality and bit_range_size cannot be null
- cardinality cant be more than 16
- prize_awards should be greater than 0
- product of cardinality and bit_range_size cannot be greater than 256
:::

### claim

Claim pick and receive rewards. Returns the amount of FT tokens 

```rust
fn claim(&mut self, draw_id: U128, pick: U128) -> u128;
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| draw_id     | DrawId    | Id of the draw                                    |
| pick        | U128      | The pick that was generated from get_picks        |

:::note
Requirements:
- pick cant be 0 and greater than the result returned from get_picks
:::

### accept_deposit_for_future_fungible_token_transfers

Deposit tokens for future fungible token transfers

```rust
fn accept_deposit_for_future_fungible_token_transfers(&mut self);
```

:::note
Requirements:
- Attach some NEAR tokens to the transaction
:::

### withdraw

Withdraw specified amount of supplied FT tokens

```rust
fn withdraw(&mut self, ft_tokens_amount: U128);
```

#### Parameters:

| Name              | Type      | Description                                            |
| ----------------- | --------- | ------------------------------------------------------ |
| ft_tokens_amount  | U128      | Amount of FT tokens that the user has supplied or less |

:::note
Requirements:
- Cant pass ft_tokens_amount greater than ft_balance_of the calling user
:::

### add_pauser_user

Add user that can pause the contract

```rust
fn add_pauser_user(&mut self, account_id: AccountId);
```

#### Parameters:

| Name        | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| account_id  | AccountId | User that is going to be able to pause the contract    |

:::note
Requirements:
- Cant pass invalid account id
- Can be called only by owner
:::

### remove_pauser_user

Remove the ability of the user to pause the contract

```rust
fn remove_pauser_user(&mut self, account_id: AccountId);
```

#### Parameters:

| Name        | Type      | Description                                            |
| ----------- | --------- | ------------------------------------------------------ |
| account_id  | AccountId | User that is not going to pause the contract           |

:::note
Requirements:
- Can be called only by owner
:::

### pause

Pause the contract, this means that the contract wont be able to accept new deposits to issue withdrawals and claim rewards

```rust
fn pause(&mut self);
```

:::note
Requirements:
- Can be called only by pauser user
:::

### resume

Resume the contract, every functionality is ready to be used

```rust
fn resume(&mut self);
```

:::note
Requirements:
- Can be called only by pauser user
:::