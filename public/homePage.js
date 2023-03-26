const logoutButton = new LogoutButton;
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if(response.success){
            alert('Чувак, очень жаль, что ты пропустишь все самое интересное. Ждем снова!');
            location.reload();
        }
    });  
}

ApiConnector.current(response => {
    ProfileWidget.showProfile(response.data);
})



const ratesBoard = new RatesBoard;
ApiConnector.getStocks(response => {
    if(response.success){
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    };    
    setInterval(response => {
        ratesBoard.clearTable();
        ratesBoard.fillTable(response.data);
    }, 60000, response);
});


const moneyManager = new MoneyManager;
moneyManager.addMoneyCallback = (data => {
    ApiConnector.addMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Твой кошелек стал чуточку толще');        
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    })
});

moneyManager.conversionMoneyCallback = (data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Успешно конвертировал!');        
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    });
});

moneyManager.sendMoneyCallback = (data => {
    console.log(data);
    ApiConnector.transferMoney(data, response => {
        if(response.success){
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Кому-то сегодня повезло');        
        }else{
            moneyManager.setMessage(response.success, response.error);
        }
    })
})

const favoritesWidget = new FavoritesWidget;
ApiConnector.getFavorites(response => {
    if(response.success){
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
        
});

favoritesWidget.addUserCallback = (data => {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, 'Плюс еще один твой кореш'); 
        }else{
            moneyManager.setMessage(response.success, response.error);
        };
    });
});

favoritesWidget.removeUserCallback = (data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success){
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(response.success, 'друзей много не бывает'); 
        }else{
            moneyManager.setMessage(response.success, response.error);
        };
    });
});