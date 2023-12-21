let selectedTerm = document.querySelector('#term');
let selectedGe = document.querySelector('#ge');
let selectedDepartment = document.querySelector('#department');
let selectedCourseNumber = document.querySelector('#number')
let selectedCourseCode = document.querySelector('#code')
let submitForm = document.querySelector('#submitForm')
let datalistOptions = document.querySelector('#departments');
let displayCourses = document.querySelector('.displayCourses')
const config = { headers: { Host: `` } }

let datalistValid = ['I%26C+SCI',`CRM%2FLAW`]
for (datalist of datalistOptions.options) {
    datalistValid.push(datalist.value)
}
let checkDepartmentTrue = () => {
    if (!selectedDepartment.value.trim().toUpperCase()) {
        return false
    } else if (datalistValid.includes(selectedDepartment.value.toUpperCase()) === false) {
        return false
    } else if (datalistValid.includes(selectedDepartment.value.toUpperCase()) === true) {
        return true
    }
}

let createTableHeaders = (name, num, title) => {
    const nameNum = document.createElement('caption');
    const span = document.createElement(`span`);
    span.innerHTML = `${name} ${num}: `
    span.classList.add(`bold`);
    nameNum.append(span);
    nameNum.append(title);

    const tr1 = document.createElement('tr');
    const code = document.createElement('th');
    code.rowSpan = 2;
    code.innerText = 'Code';
    code.classList.add('smallTdTh')

    const type = document.createElement('th');
    type.rowSpan = 2;
    type.innerText = 'Type';
    type.classList.add('smallTdTh')
    const section = document.createElement('th');
    section.rowSpan = 2;
    section.innerText = 'Section';
    section.classList.add('smallTdTh')
    const unit = document.createElement('th');
    unit.rowSpan = 2;
    unit.innerText = 'Unit';
    unit.classList.add('smallTdTh')
    const instructor = document.createElement('th');
    instructor.rowSpan = 2;
    instructor.innerText = 'Instructor';
    const time = document.createElement('th');
    time.rowSpan = 2;
    time.innerText = 'Time';
    const bldg = document.createElement('th');
    bldg.rowSpan = 2;
    bldg.classList.add('smallTdTh')
    bldg.innerText = 'Building';
    const final = document.createElement('th');
    final.innerText = 'Final';
    final.rowSpan = 2;
    const enrollmentStatus = document.createElement('th');
    enrollmentStatus.colSpan = 4;
    enrollmentStatus.innerText = 'Enrollment';
    const enrollmentStatusHeader1 = document.createElement('th');
    enrollmentStatusHeader1.innerText = 'Enrolled';
    enrollmentStatusHeader1.classList.add('smallTdTh')
    const enrollmentStatusHeader2 = document.createElement('th');
    enrollmentStatusHeader2.innerText = 'Max';
    enrollmentStatusHeader2.classList.add('smallTdTh')
    const enrollmentStatusHeader3 = document.createElement('th');
    enrollmentStatusHeader3.innerText = 'Waitlist';
    enrollmentStatusHeader3.classList.add('smallTdTh')
    const enrollmentStatusHeader4 = document.createElement('th');
    enrollmentStatusHeader4.innerText = 'Status';
    enrollmentStatusHeader4.classList.add('smallTdTh')
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
    let newTable = document.createElement('div');
    newTable.style.width = '100%'
    newTable.style.textAlign = 'center'
    newTable.append(nameNum)
    newTable.append(tr1)
    newTable.append(tr2)
    return newTable;
}

let createCourse = (classes) => {
    let newTr = document.createElement('tr');
    courseCode = document.createElement('td');
    courseCode.innerText = classes.sectionCode;
    courseCode.classList.add('smallTdTh')
    newTr.append(courseCode)
    courseType = document.createElement('td');
    courseType.classList.add('smallTdTh')
    courseType.innerText = classes.sectionType;
    newTr.append(courseType)
    courseSection = document.createElement('td');
    courseSection.innerText = classes.sectionNum;
    courseSection.classList.add('smallTdTh')
    newTr.append(courseSection)
    courseUnit = document.createElement('td');
    courseUnit.innerText = classes.units;
    courseUnit.classList.add('smallTdTh')
    newTr.append(courseUnit)
    courseInstructor = document.createElement('td');
    courseInstructor.innerText = classes.instructors;
    newTr.append(courseInstructor)
    courseTime = document.createElement('td');
    courseTime.innerText = classes.meetings[0].days + classes.meetings[0].time;
    newTr.append(courseTime)
    courseBuilding = document.createElement('td');
    courseBuilding.innerText = classes.meetings[0].bldg;
    courseBuilding.classList.add('smallTdTh')
    newTr.append(courseBuilding)
    courseFinal = document.createElement('td');
    courseFinal.innerText = classes.finalExam;
    newTr.append(courseFinal);
    courseCurrentEnrolled = document.createElement('td');
    courseCurrentEnrolled.innerText = classes.numCurrentlyEnrolled.totalEnrolled;
    courseCurrentEnrolled.classList.add('smallTdTh');
    newTr.append(courseCurrentEnrolled);
    courseMaxCapacity = document.createElement('td');
    courseMaxCapacity.innerText = classes.maxCapacity;
    courseMaxCapacity.classList.add('smallTdTh');
    newTr.append(courseMaxCapacity)
    courseCurrentWaitlist = document.createElement('td');
    courseCurrentWaitlist.innerText = classes.numOnWaitlist;
    courseCurrentWaitlist.classList.add('smallTdTh');
    newTr.append(courseCurrentWaitlist)
    courseStatus = document.createElement('td');
    courseStatus.innerText = classes.status;
    courseStatus.classList.add('smallTdTh')
    newTr.append(courseStatus)
    return newTr;
}

let appendCourse = (data) => {
    for (number of data.schools[0].departments[0].courses) {
        let courseDiv = document.createElement('div');
        courseDiv.append(createTableHeaders(number.deptCode, number.courseNumber, number.courseTitle));
        for (course of number.sections) {
            courseDiv.append(createCourse(course));
        }
        console.log(courseDiv)
        displayCourses.append(courseDiv);
    }
}

let appendCourseGe = (data) => {
    for (school of data.schools) {
        for (department of school.departments) {
            for (number of department.courses) {
                let courseDiv = document.createElement('div');
                courseDiv.append(createTableHeaders(number.deptCode, number.courseNumber, number.courseTitle));
                for (course of number.sections) {
                    courseDiv.append(createCourse(course));
                }
                console.log(courseDiv)
                displayCourses.append(courseDiv);
            }
        }
    }
}

submitForm.addEventListener('click', async (e) => {
    e.preventDefault();
    displayCourses.innerHTML = '';

    if (selectedDepartment.value === 'I&C SCI') {
        selectedDepartment.value = 'I%26C+SCI';
    } else if (selectedDepartment.value === 'CRM/LAW') {
        selectedDepartment.value = 'CRM%2FLAW';
    }

    let departmentTrue = checkDepartmentTrue();

    if (selectedCourseCode.value.trim() !== '') {
        let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?sectionCodes=${selectedCourseCode.value.trim()}&term=${selectedTerm.value}`)
        let data = await res.json();
        appendCourse(data)

    } else if (selectedGe.value.trim() !== '' && selectedGe.value.trim() !== 'ANY') {
        if (departmentTrue === false) {
            try {
                let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?ge=${selectedGe.value.trim()}&term=${selectedTerm.value}`)
                let data = await res.json();
                appendCourseGe(data);
            } catch (e) {
                console.log(e)
            }
        } else if (departmentTrue === true) {
            try {
                let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?ge=${selectedGe.value}&term=${selectedTerm.value}&department=${selectedDepartment.value.trim()}`)
                let data = await res.json();
                appendCourseGe(data);
            } catch (e) {
                console.log(e)
            }
        }
    } else if (departmentTrue === true && selectedCourseNumber.value.trim() === '') {
        try {
            let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?department=${selectedDepartment.value.trim()}&term=${selectedTerm.value}`);
            let data = await res.json();
            appendCourse(data)
        } catch (e) {
            console.log(e);
            alert(`Department does not exist. Try again.`)
        }

    } else if (departmentTrue === true && selectedCourseNumber.value.trim() !== '') {
        try {
            let res = await fetch(`https://api.peterportal.org/rest/v0/schedule/soc?department=${selectedDepartment.value.trim()}&courseNumber=${selectedCourseNumber.value.trim()}&term=${selectedTerm.value}`);
            let data = await res.json();
            appendCourse(data)
        } catch (e) {
            console.log(e);
            alert(`Course either not offered or does not exist. Try again.`)
        }
    }
});
