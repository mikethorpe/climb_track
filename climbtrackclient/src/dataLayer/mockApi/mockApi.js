export default {
    climbingSessions: [
        {
            id: 1,
            dateTime: '22th April 2019',
            maxGrade: '7b',
            climbs: [
                { id: 1234, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 345215, grade: '7b', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 2,
            dateTime: '24th April 2019',
            maxGrade: '8a+',
            climbs: [
                { id: 23742, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 1263524234, grade: '6a', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 3,
            dateTime: '22th May 2019',
            maxGrade: '6a',
            climbs: [
                { id: 324512, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 12361, grade: '6a', style: { id: 3, description: 'Arete' } }
            ]
        }
    ],
    styles: [
        { id: 1, description: 'Overhang' },
        { id: 2, description: 'Slab' },
        { id: 3, description: 'Crimpy' },
    ],

};