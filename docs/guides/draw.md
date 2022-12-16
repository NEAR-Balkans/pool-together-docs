# Draw

Draw contract is going to be called by a scheduled task on accepted interval.
Its 4 self-describing methods makes its use very easy to follow.

## How To interact with Draw contract

Every scheduled task call should call the 4 methods.
First call can_start_draw, it will return true/false whether it can start draw. If yes then call start_draw.
Then call can_complete_draw, respectively call the complete_draw if returns true.