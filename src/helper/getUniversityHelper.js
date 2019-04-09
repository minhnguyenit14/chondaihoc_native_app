import { UNIVERSITY_KIND, UNIVERSITY_TYPE } from '../constants';

export const getUniversityType = (universityType) => {
    return UNIVERSITY_TYPE.filter(u => u.universityType === universityType)[0].type;
}

export const getUniversityKind = (universityKind) => {
    return UNIVERSITY_KIND[universityKind ? 1 : 0].kind
}