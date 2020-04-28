export default {
    climbingSessions: [
        {
            id: 1,
            dateTime: '22th April 2019',
            maxGrade: '7b',
            climbs: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '7b', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 2,
            dateTime: '24th April 2019',
            maxGrade: '8a+',
            climbs: [
                { id: 1, grade: '7a', style: { id: 1, description: 'Overhang' } },
                { id: 2, grade: '9b++', style: { id: 2, description: 'Slab' } }
            ]
        },
        {
            id: 3,
            dateTime: '22th May 2019',
            maxGrade: '9a+',
            climbs: [
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

};