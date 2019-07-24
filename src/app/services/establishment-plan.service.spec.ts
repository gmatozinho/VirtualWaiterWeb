import { TestBed } from '@angular/core/testing';

import { EstablishmentPlanService } from './establishment-plan.service';

describe('EstablishmentPlanService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EstablishmentPlanService = TestBed.get(EstablishmentPlanService);
    expect(service).toBeTruthy();
  });
});
