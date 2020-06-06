import gradesObject from "../dataLayer/constants/grades";
const grades = gradesObject.frenchSport;

export const calculateMaxGradeFromClimbs = (climbs) => {
  let maxGradeIndex = 0;
  climbs.forEach((climb) => {
    let gradeIndex = grades.indexOf(climb.grade);
    if (gradeIndex > maxGradeIndex) {
      maxGradeIndex = gradeIndex;
    }
  });
  return grades[maxGradeIndex];
};

export const calculateMinGradeFromClimbs = (climbs) => {
  let minGradeIndex = grades.length - 1;
  climbs.forEach((climb) => {
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
  const maxGradeIndex = grades.indexOf(maxGrade);
  const minGradeIndex = grades.indexOf(minGrade);
  const gradeDistribution = [];

  for (let index = minGradeIndex; index <= maxGradeIndex; index++) {
    const numberOfClimbsAtgrade = climbs.filter(
      (climb) => climb.grade === grades[index]
    ).length;
    gradeDistribution.push({
      name: grades[index],
      total: numberOfClimbsAtgrade,
    });
  }
  return gradeDistribution;
};

//TODO: Optimize this function
export const generateStyleDistribution = (climbs, styles) => {
  const styledDistribution = [];
  styles.forEach((style) => {
    const numberOfClimbsOfStyle = climbs.filter(
      (climb) => climb.style.id === style.id
    ).length;
    styledDistribution.push({
      styleDescription: style.description,
      total: numberOfClimbsOfStyle,
    });
  });
  return styledDistribution;
};
