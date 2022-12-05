# Draw
- [Source Code](https://github.com/Shard-Labs/pool-together/tree/main/draw/)

## View Methods

### can_start_draw

Returns if a draw can be started

```rust
fn can_start_draw(&self) -> bool;
```

### can_complete_draw

Returns if a draw can be completed

```rust
fn can_complete_draw(&self) -> bool;
```

### get_draws

Returns a collection of Draws

```rust
fn get_draws(&self, from_index: usize, limit: usize) -> Vec<Draw>;
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| from_index  | usize     | From which index to start getting the elements    |
| limit       | usize     | How many elements to get at maximum               |

### get_draw

Returns a Draw by its identifier

```rust
fn get_draw(&self, id: DrawId) -> Draw
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| id          | DrawId    | Id of the draw                                    |


## Methods

## init method
### new

Initializes the contract

```rust
fn new(owner_id: AccountId)
```

#### Parameters:

| Name        | Type      | Description                                       |
| ----------- | --------- | ------------------------------------------------- |
| owner_id    | AccountId | Id of the owner                                   |


### start_draw

Starts a draw

```rust
fn start_draw(&mut self);
```

:::note
Requirements:
- can_start_draw should return true
:::

### complete_draw

Completes a draw

```rust
fn complete_draw(&mut self);
```

:::note
Requirements:
- can_complete_draw should return true
:::