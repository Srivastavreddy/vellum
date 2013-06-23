
function initTest() {
    console.log('initTest');
}

function loggable(message) {
    return 'none';
}

var wsHandler = {
    open: function() {
        console.log('open');
    },
    close: function() {
        console.log('close');
    },
    events: {
        chat: function(event) {
            if (typeof chatRes === 'function') {
                chatRes(event);
            } else {
                console.warn('events chatRes not defined');
            }
        }
    }   
}

var mockServer = {
    log: function(message) {
        if (loggable(message) === 'client') {
            console.log(message);
        } else if (loggable(message) === 'server') {
            console.log('server log: ' + message);
            $.ajax({
                type: 'POST',
                url: '/log',
                data: message,
                success: function() {
                },
                error: function() {
                }
            });
        } 
    },
    ajax: function(req) {
        console.log('mockServer.ajax', req.url, req.data);
        res = mockRes(req);
        console.log("mockServer res", res);
        req.success(res);
    },
    send: function(type, data) {
        var event = mockSocketEvent(type, data);
        console.log('mockServer.send', type, data, event);
        if (type === 'chat') {
            wsHandler.events.chat(event);
        } else {
            console.warn('mockServer.send type', type);
        }
    },
    googleLoginAuthorize: function() {
        var res = {
            access_token: 'dummy_access_token'
        };
        googleLoginAuthorizeRes(res);
    },
    googleClient: function() {
    },
    documentReady: function() {
        mockInit();
        this.googleLoginAuthorize();
    }
};

var mockData = {
    login: {
        name: 'Testy Tester',
        email: 'test@gmail.com',
        picture: '',
        totpSecret: '',
        totpUrl: '',
        qr: '',
    },
    logout: {
        email: 'test@gmail.com'
    },
    contacts: [
        {
            name: 'Joe Soap',
            mobile: '27827779988',
            email: 'joe@gmail.com',
        },
        {
            name: 'Ginger Bread',
            mobile: '2783667300',
            email: 'gingerb@gmail.com',
        },
        {
            name: 'Harry Potter',
            mobile: '2783667400',
            email: 'harryp@gmail.com',
        }
    ],
    orgs: [
        {
            orgUrl: 'biz.net',
            orgCode: 'Biz Company',
            displayName: 'Biz (Pty) Ltd',
            region: 'Western Cape',
            locality: 'Cape Town',
            country: 'South Africa'
        },
        {
            orgUrl: 'other.net',
            orgCode: 'Other Biz Company',
            displayName: 'The Other Company (Pty) Ltd',
            region: 'Western Cape',
            locality: 'Cape Town',
            country: 'South Africa'
        }
    ],
    textMessages: [
        "Hi there",
        "Hello!",
        "How are you?",
        "Good, thanks. What's up?",
        "Are you going to the event tonight?",
        "No, other plans...",
        "Ok ;)",
        "So see you Saturday :)",
        "For sure. Ok, bye.",
        "Bye.",
    ],
    chats: [
    ],
    eventTypes: [
        {
            name: 'Meeting',
        },
        {
            name: 'Lunch',
        },
        {
            name: 'Dinner party',
        },
        {
            name: 'Coffee',
        },
        {
            name: 'Drinks',
        },
        {
            name: 'Poker',
        },
    ],
    placeTypes: [
        {
            name: 'Restaurant',
        },
        {
            name: 'Coffee House',
        },
        {
            name: 'Bar',
        },
        {
            name: 'Home',
        },
        {
            name: 'Office',
        },

    ],
    places: [
        {
            name: 'Mugg & Bean',
        },
        {
            name: 'Biz Meeting Room 1',
            org: 'Biz Company'            
        },
    ],
    events: [
        {            
            type: 'Poker',
            
        },        
        { 
            type: 'Meeting',
            place: 'Meeting Room 1'
        },
        {            
        },
        {            
        },
    ]
};


function ChatMessage(contact, textMessage, time) {
    this.contact = contact;
    this.textMessage = textMessage;
    this.time = time;
    server.log('ChatMessage', contact, textMessage);
}

function Chat(contacts, messages) {
    this.name = contacts[0].name;
    this.contacts = contacts;
    this.messages = messages;
    server.log('Chat', contacts[0].name, messages.length, messages[0].textMessage);
}

function mockChatMessages(index, contact, time) {
    var chatMessages = [];
    foreach(mockData.textMessages, function(i, textMessage) {
        if (index === 0 || i < index*2 + 4) {
            var chatMessage = null;
            if (i % 2 === 0) {
                chatMessage = new ChatMessage(contact, textMessage, time + i * 7 * 1000);
            } else {
                chatMessage = new ChatMessage(null, textMessage, time + i * 9 * 1000);
            }
            server.log('mockBuildChat', chatMessage);
            chatMessages.push(chatMessage);
        }
    });
    server.log('mockBuildChat', contact.name, chatMessages.length, chatMessages[0].textMessage);
    return chatMessages;
}

function mockInit() {
    var time = new Date();
    foreach(mockData.contacts, function(i, contact) {
        server.log('mockReady', contact);
        time = new Date(time.getTime() - 1000 * 999 * i);
        mockData.chats.push(new Chat([contact], mockChatMessages(i, contact, time)));
    });
    mockData.login.contacts = mockData.contacts;
    mockData.login.chats = mockData.chats;
    server.log('mockReady', mockData.chats.length, mockData.chats[0]);
}

function mockRes(req) {
    if (req.url === '/googleLogin') {
        return mockData.login;
    } else if (req.url === '/personaLogin') {
        return mockData.login;
    } else if (req.url === '/logout') {
        return mockData.logout;
    } else if (req.url === '/chatGet') {
        return chat;
    } else if (req.url === '/chatList') {
        return chatList;
    } else if (req.url === '/contactEdit') {
        return req.data;
    } else if (req.url === '/contactList') {
        return mock.contacts;
    }
    return {
        error: 'mockRes ' + req.url
    }
}

function mockSocketEvent(type, data) {
    console.log('mockSocketEvent', type, data);
    if (type === 'chat') {
        return {
            data: {
                name: data.name,
                text: 'OK ' + data.text
            }
        };
    } else {
        console.warn('mockSocketEvent', type, data);
    }
}
