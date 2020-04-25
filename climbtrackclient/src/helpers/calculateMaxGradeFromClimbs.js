const calculateMaxGradeFromClimbs = (climbs, grades) => {
    let maxGradeIndex = 0;
    climbs.forEach(climb => {
        let gradeIndex = grades.indexOf(climb.grade);
        if (gradeIndex > maxGradeIndex) {
            maxGradeIndex = gradeIndex;
        }
    });
    return grades[maxGradeIndex];
};

export default calculateMaxGradeFromClimbs;