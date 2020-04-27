export default {
    climbingSessions: [
        {
            id: 1,
            dateTime: '22th April 2019',
            maxGrade: '7b',
            log: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '7b', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 2,
            dateTime: '24th April 2019',
            maxGrade: '8a+',
            log: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '9b++', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 3,
            dateTime: '22th May 2019',
            maxGrade: '9a+',
            log: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '9b++', style: { id: 3, description: 'Arete' } }
            ]
        }
    ],
    styles: [
        { id: 1, description: 'Overhang' },
        { id: 2, description: 'Slab' },
        { id: 3, description: 'Crimpy' },
    ],
    grades: {
        frenchSport: [
            '3',
            '3+',
            '4',
            '4+',
            '5',
            '5+',
            '6a',
            '6a+',
            '6b',
            '6b+',
            '6c',
            '6c+',
            '7a',
            '7a+',
            '7b',
            '7b+',
            '7c',
            '7c+'
        ]
    }
};