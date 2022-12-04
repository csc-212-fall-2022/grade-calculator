import { ICategory } from "./Category"
import { IItem } from "./Item"

export const categoryData: Record<number, ICategory> = {
    1: {
        id: 1,
        name: "Homework",
        items: [1,2, 6, 7, 8, 9, 10],
        totalPoints: 25,
    },
    2: {
        id: 2,
        name: "Exams",
        items: [3,4],
        totalPoints: 35
    },
    3: {
        id: 3,
        name: "Final",
        items: [5],
        totalPoints: 45
    }
}

export const itemData: Record<number, IItem> = {
    1: {
        id: 1,
        name: "Homework 1",
        pointsPossible: 4,
        frozen: false
    },
    2: {
        id: 2,
        name: "Homework 2",
        pointsPossible: 10,
        frozen: false
    },
    3: {
        id: 3,
        name: "Exam 1",
        pointsPossible: 31,
        frozen: false
    },
    4: {
        id: 4,
        name: "Exam 2",
        pointsPossible: 31,
        frozen: false
    },
    5: {
        id: 5,
        name: "Final",
        pointsPossible: 100,
        frozen: false
    },
    6: {
        id: 6,
        name: "Homework 3",
        pointsPossible: 14,
        frozen: false
    }, 
    7: {
        id: 7,
        name: "Homework 4",
        pointsPossible: 16,
        frozen: false
    }, 
    8: {
        id: 8,
        name: "Homework 5",
        pointsPossible: 5,
         frozen: false
    }, 
    9: {
        id: 9,
        name: "Homework 6",
        pointsPossible: 10,
        frozen: false
    },
    10: {
        id: 10,
        name: "Homework 7",
        pointsPossible: 10,
        frozen: false
    }
}