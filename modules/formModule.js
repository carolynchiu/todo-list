export const FormModule = (() => {
    const validateInput = (todoInput, dateInput) => {
        if (!todoInput.value) {
            alert("Please enter some text !");
            return false;
        }
        if (!dateInput.value) {
            alert("Please enter month and date");
            return false;
        }
        return true;
    };

    const cleanInputFields = (todoInput, dateInput) => {
        todoInput.value = "";
        dateInput.value = "";
    };

    return {
        validateInput,
        cleanInputFields,
    };
})();

