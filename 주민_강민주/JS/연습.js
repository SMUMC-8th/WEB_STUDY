class Student {
    constructor(name, school) {
        this._name = name;
        this._school = school;
    }

    // Getter
    get name() {
        return this._name;
    }

    get school() {
        return this._school;
    }

    // Setter
    set name(newName) {
        if (newName.length > 1) {
            this._name = newName;
        } else {
            console.log("이름은 최소 두 글자 이상이어야 합니다.");
        }
    }

    set school(newSchool) {
        if (newSchool) {
            this._school = newSchool;
        } else {
            console.log("학교명을 입력해야 합니다.");
        }
    }

    introduction() {
        console.log(`안녕하세요, ${this._name}입니다. ${this._school}에 다니고 있습니다.`);
    }
}

// 📌 객체 생성 및 활용
const jumin = new Student("주민", "상명대학교");
jumin.introduction();  // "안녕하세요, 주민입니다. 상명대학교에 다니고 있습니다."

// 📌 Getter 사용
console.log(jumin.name);  // "주민"
console.log(jumin.school); // "상명대학교"

// 📌 Setter 사용
jumin.name = "주민";
jumin.school = "";
jumin.introduction();  // "안녕하세요, Jay입니다. 카이스트에 다니고 있습니다." (학교명은 빈 값 변경 안됨)
