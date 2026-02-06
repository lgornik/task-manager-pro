// store/tasks/tasks.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { initialTasksState, tasksAdapter } from './tasks.state';
import * as TasksActions from './tasks.actions';

export const tasksReducer = createReducer(
    initialTasksState,

    // Load tasks
    on(TasksActions.loadTasks, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(TasksActions.loadTasksSuccess, (state, { tasks }) =>
        tasksAdapter.setAll(tasks, {
            ...state,
            loading: false
        })
    ),

    on(TasksActions.loadTasksFailure, (state, { error }) => ({
        ...state,
        error,
        loading: false
    })),

    // Add task
    on(TasksActions.addTaskSuccess, (state, { task }) =>
        tasksAdapter.addOne(task, state)
    ),

    // Update task
    on(TasksActions.updateTask, (state, { task }) =>
        tasksAdapter.updateOne(
            { id: task.id, changes: task },
            state
        )
    ),

    // Delete task
    on(TasksActions.deleteTask, (state, { id }) =>
        tasksAdapter.removeOne(id, state)
    ),

    // Toggle task
    on(TasksActions.toggleTask, (state, { id }) => {
        const task = state.entities[id];
        if (!task) return state;

        return tasksAdapter.updateOne(
            {
                id,
                changes: { completed: !task.completed }
            },
            state
        );
    }),

    // Set filter
    on(TasksActions.setFilter, (state, { filter }) => ({
        ...state,
        filter
    })),

    // W reducer dodaj:

    on(TasksActions.deleteCompletedTasks, (state) => {
        const completedIds = Object.values(state.entities)
            .filter(task => task?.completed)
            .map(task => task!.id);

        return tasksAdapter.removeMany(completedIds, state);
    }),

    on(TasksActions.toggleAllTasks, (state, { completed }) => {
        const updates = Object.keys(state.entities).map(id => ({
            id,
            changes: { completed }
        }));

        return tasksAdapter.updateMany(updates, state);
    }),

    on(TasksActions.updateTaskPriority, (state, { id, priority }) =>
        tasksAdapter.updateOne(
            { id, changes: { priority } },
            state
        )
    )
);