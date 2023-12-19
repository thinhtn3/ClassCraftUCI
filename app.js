let selectedTerm = document.querySelector('#term');
let selectedGe = document.querySelector('#ge');
let selectedDepartment = document.querySelector('#department');
let selectedCourseNumber = document.querySelector('#number')
let selectedCourseCode = document.querySelector('#code')
let submitForm = document.querySelector('#submitForm')
let datalistOptions = document.querySelector('#departments');
let displayCourses = document.querySelector('.displayCourses')
const config = { headers: { Host: `` } }

let datalistValid = []
for (datalist of datalistOptions.options) {
    datalistValid.push(datalist.value)
}

let checkCourseCodeTrue = async (code) => {
    try {
        let classArr = []
        let classInfo = {};
        const res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?term=${selectedTerm.value}&sectionCodes=${selectedCourseCode.value.trim()}`)
        const data = await res.json();
        classInfo.courseName = data.schools[0].departments[0].courses[0].deptCode;
        classInfo.courseNumber = data.schools[0].departments[0].courses[0].courseNumber;
        classInfo.courseTitle = data.schools[0].departments[0].courses[0].courseTitle;
        classInfo.type = data.schools[0].departments[0].courses[0].sections[0].sectionType;
        classInfo.section = data.schools[0].departments[0].courses[0].sections[0].sectionNum;
        classInfo.units = data.schools[0].departments[0].courses[0].sections[0].units;
        classInfo.instructor = data.schools[0].departments[0].courses[0].sections[0].instructors[0];
        classInfo.days = data.schools[0].departments[0].courses[0].sections[0].meetings[0].days;
        classInfo.time = data.schools[0].departments[0].courses[0].sections[0].meetings[0].time;
        classInfo.building = data.schools[0].departments[0].courses[0].sections[0].meetings[0].bldg;
        classInfo.currentEnrolled = data.schools[0].departments[0].courses[0].sections[0].numCurrentlyEnrolled.totalEnrolled;
        classInfo.maxEnrolled = data.schools[0].departments[0].courses[0].sections[0].maxCapacity;
        classInfo.currentWaitlist = data.schools[0].departments[0].courses[0].sections[0].numOnWaitlist;
        classInfo.final = data.schools[0].departments[0].courses[0].sections[0].finalExam;
        classInfo.restrictions = data.schools[0].departments[0].courses[0].sections[0].restrictions;
        classInfo.status = data.schools[0].departments[0].courses[0].sections[0].status;
        classArr.push(classInfo)
        return classInfo;
    } catch (e) {
        console.log('There is an error', e)
        alert(`Course code is invalid or does not exist, please try again`)
    }
}

let checkDepartmentTrue = () => {
    if (!selectedDepartment.value.trim()) {
        alert('Please enter a department')
        return false
    } else if (datalistValid.includes(selectedDepartment.value) === false) {
        alert('Department does not exist')
        return false
    } else {
        return true
    }
}

let checkCourseNumberTrue = () => {
    if (!selectedCourseNumber.value.trim()) {
        return false
    } else if (selectedCourseNumber.value.trim() !== '') {
        return true
    }
}

let createTableHeaders = () => {
    const tr1 = document.createElement('tr');
    const code = document.createElement('th');
    code.rowSpan = 2;
    code.innerText = 'Code';
    const type = document.createElement('th');
    type.rowSpan = 2;
    type.innerText = 'Type';
    const section = document.createElement('th');
    section.rowSpan = 2;
    section.innerText = 'Section';
    const unit = document.createElement('th');
    unit.rowSpan = 2;
    unit.innerText = 'Unit';
    const instructor = document.createElement('th');
    instructor.rowSpan = 2;
    instructor.innerText = 'Instructor';
    const time = document.createElement('th');
    time.rowSpan = 2;
    time.innerText = 'Time';
    const bldg = document.createElement('th');
    bldg.rowSpan = 2;
    bldg.innerText = 'Building';
    const final = document.createElement('th');
    final.innerText = 'Final';
    final.rowSpan = 2;
    const enrollmentStatus = document.createElement('th');
    enrollmentStatus.colSpan = 4;
    enrollmentStatus.innerText = 'Enrollment';
    const enrollmentStatusHeader1 = document.createElement('th');
    enrollmentStatusHeader1.innerText = 'Enrolled';
    const enrollmentStatusHeader2 = document.createElement('th');
    enrollmentStatusHeader2.innerText = 'Max';
    const enrollmentStatusHeader3 = document.createElement('th');
    enrollmentStatusHeader3.innerText = 'Waitlist';
    const enrollmentStatusHeader4 = document.createElement('th');
    enrollmentStatusHeader4.innerText = 'Status';
    const tr2 = document.createElement('tr');
    tr2.append(enrollmentStatusHeader1);
    tr2.append(enrollmentStatusHeader2);
    tr2.append(enrollmentStatusHeader3);
    tr2.append(enrollmentStatusHeader4);
    tr1.append(code);
    tr1.append(type);
    tr1.append(section);
    tr1.append(unit);
    tr1.append(instructor);
    tr1.append(time);
    tr1.append(bldg);
    tr1.append(final);
    tr1.append(enrollmentStatus);
    displayCourses.append(tr1);
    displayCourses.append(tr2);
}

let createCourse = (classes) => {
    let newTr = document.createElement('tr');

    courseCode = document.createElement('td');
    courseCode.innerText = classes.sectionCode;
    newTr.append(courseCode)
    courseType = document.createElement('td');
    courseType.innerText = classes.sectionType;
    newTr.append(courseType)
    courseSection = document.createElement('td');
    courseSection.innerText = classes.sectionNum;
    newTr.append(courseSection)
    courseUnit = document.createElement('td');
    courseUnit.innerText = classes.units;
    newTr.append(courseUnit)
    courseInstructor = document.createElement('td');
    courseInstructor.innerText = classes.instructors;
    newTr.append(courseInstructor)
    courseTime = document.createElement('td');
    courseTime.innerText = classes.meetings[0].days + classes.meetings[0].time;
    newTr.append(courseTime)
    courseBuilding = document.createElement('td');
    courseBuilding.innerText = classes.meetings[0].bldg;
    newTr.append(courseBuilding)
    courseFinal = document.createElement('td');
    courseFinal.innerText = classes.finalExam;
    newTr.append(courseFinal)
    courseCurrentEnrolled = document.createElement('td');
    courseCurrentEnrolled.innerText = classes.numCurrentlyEnrolled.totalEnrolled;
    newTr.append(courseCurrentEnrolled)
    courseMaxCapacity = document.createElement('td');
    courseMaxCapacity.innerText = classes.maxCapacity;
    newTr.append(courseMaxCapacity)
    courseCurrentWaitlist = document.createElement('td');
    courseCurrentWaitlist.innerText = classes.numOnWaitlist;
    newTr.append(courseCurrentWaitlist)
    courseStatus = document.createElement('td');
    courseStatus.innerText = classes.status;
    newTr.append(courseStatus)

    displayCourses.append(newTr)
}

submitForm.addEventListener('click', async (e) => {
    e.preventDefault();
    let departmentValid = checkDepartmentTrue();
    displayCourses.innerHTML= ''

    if (selectedCourseCode.value.trim() !== '') {
        let classArr = [];
        let res = await checkCourseCodeTrue(selectedCourseCode.value.trim());
        classArr.push(res);
        createTableHeaders();
        for (classes of classArr) {
            createCourse(classes, classArr)
        }

    } else if (departmentValid === true && selectedCourseNumber.value.trim() === '') {
        try {
            let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?department=${selectedDepartment.value.trim()}&term=${selectedTerm.value}`)
            let data = await res.json();
            for (number of data.schools[0].departments[0].courses) {
                createTableHeaders();
                for (course of number.sections) {
                    createCourse(course)
                }
            }
        } catch (e) {
            console.log(e)
        }
    } else if (departmentValid === true && selectedCourseNumber.value.trim() !== '') {
        let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?department=${selectedDepartment.value.trim()}&courseNumber=${selectedCourseNumber.value.trim()}&term=${selectedTerm.value}`);
        let data = await res.json();
        for (number of data.schools[0].departments[0].courses) {
            createTableHeaders();
            for (course of number.sections) {
                createCourse(course)
            }
        }
    }
});
