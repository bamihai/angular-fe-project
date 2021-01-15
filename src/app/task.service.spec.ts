import { TestBed, async } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { } from 'jasmine';
import { Observable, throwError } from 'rxjs';
import { ITask } from './shared/entities/task';
import { MzToastService } from 'ngx-materialize';

describe('TaskService', () => {
    let taskService: TaskService;


    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [TaskService, MzToastService]

        });
        taskService = TestBed.get(TaskService);
    }));

    describe('Test getTasks()', () => {
        it('the pipe should be called', () => {
            const getTasksSpy = spyOn(HttpClient.prototype, 'get').and.returnValue(new Observable());
            const getTasksPipeSpy = spyOn(Observable.prototype, 'pipe').and.returnValue(new Observable());
            taskService.getTasks();
            expect(getTasksSpy).toHaveBeenCalled();
            expect(getTasksPipeSpy).toHaveBeenCalled();
        });
    });

    describe('Test handleError()', () => {
        it('handleError should be called', () => {

            const dummyObject = {
                message: '404 - Not found',
                status: 200,
                statusText: 'OK!'
            };

            const errMsg = (dummyObject.message) ? dummyObject.message :
            dummyObject.status ? `${dummyObject.status} - ${dummyObject.statusText}` : '404 - Not found';

            expect(JSON.stringify((taskService as any).handleError(dummyObject))).toBe(JSON.stringify(throwError(errMsg)));
        });
    });

    describe('Test addTasks()', () => {
        it('the pipe should be called', () => {
            const addTasksSpy = spyOn(HttpClient.prototype, 'post').and.returnValue(new Observable());
            const addTasksPipeSpy = spyOn(Observable.prototype, 'pipe').and.returnValue(new Observable());
            const task = <ITask>{
                name: 'Task 1',
                'description': 'Task foarte important',
                'startDate': '10.10.2018',
                'endDate': '-',
                'labels': ['FE', 'QA', 'UX'],
                'status': 'TODO'
            };
            taskService.addTask(task);
            expect(addTasksSpy).toHaveBeenCalled();
            expect(addTasksPipeSpy).toHaveBeenCalled();
        });
    });

    describe('test deleteTask()', () => {
        it('delete should be called', () => {
            const deleteTaskSpy = spyOn(HttpClient.prototype, 'delete');
            const id = 1;
            taskService.deleteTask(id);
            expect(deleteTaskSpy).toHaveBeenCalled();
        });
    });

    describe('test updateTask()', () => {
        it('update should be called', () => {
            const updateTaskSpy = spyOn(HttpClient.prototype, 'put').and.returnValue(new Observable());
            const updateTaskPipeSpy = spyOn(Observable.prototype, 'pipe').and.returnValue(new Observable());
            const task = <ITask>{
                'name': 'Task 1',
                'description': 'Task foarte important',
                'startDate': '10.10.2018',
                'endDate': '-',
                'labels': ['FE', 'QA', 'UX'],
                'status': 'TODO'
            };
            taskService.updateTask(task);
            expect(updateTaskSpy).toHaveBeenCalled();
            expect(updateTaskPipeSpy).toHaveBeenCalled();
        });
    });
});

