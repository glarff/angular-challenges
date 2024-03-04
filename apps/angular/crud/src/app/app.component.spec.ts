import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { TodoHttpService } from './service/http.service';

describe('HttpService', () => {
  let httpService: TodoHttpService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TodoHttpService],
    });

    httpService = TestBed.inject(TodoHttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that there are no outstanding requests after each test
  });

  it('should retrieve data from the API via GET', () => {
    const testData = {
      /* Your test data here */
    };
    const apiUrl = 'https://example.com/api/data';

    // Make a mock HTTP request
    httpService.get().subscribe((data) => {
      expect(data).toEqual(testData); // Assert that the response matches the test data
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET'); // Assert that a GET request was made
    req.flush(testData); // Provide a mock response
  });

  // Add more test cases for error handling, other HTTP methods, etc.
});
