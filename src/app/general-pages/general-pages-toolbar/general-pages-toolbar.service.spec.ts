import { TestBed } from '@angular/core/testing';

import { GeneralPagesToolbarService } from './general-pages-toolbar.service';

describe('GeneralPagesToolbarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralPagesToolbarService = TestBed.get(GeneralPagesToolbarService);
    expect(service).toBeTruthy();
  });
});
