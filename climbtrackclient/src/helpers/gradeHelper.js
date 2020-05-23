import gradesObject from '../dataLayer/constants/grades';
const grades = gradesObject.frenchSport;

export const calculateMaxGradeFromClimbs = (climbs) => {
    let maxGradeIndex = 0;
    climbs.forEach(climb => {
        let gradeIndex = grades.indexOf(climb.grade);
        if (gradeIndex > maxGradeIndex) {
            maxGradeIndex = gradeIndex;
        }
    });
    return grades[maxGradeIndex];
};

export const calculateMinGradeFromClimbs = (climbs) => {
    let minGradeIndex = grades.length - 1;
    climbs.forEach(climb => {
        let gradeIndex = grades.indexOf(climb.grade);
        if (gradeIndex < minGradeIndex) {
            minGradeIndex = gradeIndex;
        }
    });
    return grades[minGradeIndex];
};


// TODO: Optimize this function - some parts can be abstracted
export const generateGradeDistribution = (climbs) => {

    const maxGrade = calculateMaxGradeFromClimbs(climbs);
    const minGrade = calculateMinGradeFromClimbs(climbs);
    console.log(`minGrade ${minGrade}`);
    const maxGradeIndex = grades.indexOf(maxGrade);
    const minGradeIndex = grades.indexOf(minGrade);
    const gradeDistribution = [];

    for (let index = minGradeIndex; index <= maxGradeIndex; index++) {
        const numberOfClimbsAtgrade = climbs.filter(climb => climb.grade === grades[index]).length;
        gradeDistribution.push({
            name: grades[index],
            total: numberOfClimbsAtgrade
        });
    };
    return gradeDistribution;
};