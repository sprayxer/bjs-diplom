'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if(response.success){
            alert(`Рад снова тебя видеть, дружище "${data.login}"`);
            location.reload();
        }
    });
    
}

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if(!response.success){
            alert(response.error);
            return;
        }
        alert(`Приветсвую тебя новичок "${data.login}"`);
        location.reload();
    });
}