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