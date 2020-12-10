import Assignment from "./Assignment";

/** 
 * REACT class that will be our homepage for the site
 * assignments: The list of assignments that the student/teacher viewing the page can access
 */
export default class Homepage {
    private assignments: Assignment[]
    constructor(assignments: Assignment[]) {
        this.assignments = assignments
    }
}