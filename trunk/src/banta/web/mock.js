
function initTest() {
    console.log('initTest');
}

var mockServer = {
    auth: '',
    googleAccessToken: '',
    googleLoginAuthorize: function() {
        var res = {
            access_token: 'dummy_access_token'
        };
        googleLoginAuthorizeRes(res);        
    },
    ajax: function(req) {
        console.log('server.ajax: ' + req.url);
        res = mockRes(req);
        console.log(res);
        req.success(res);
    },
    googleClient: function() {        
    },
    getPlus: function() {        
    }
};

var contact1 = {
    name: 'Joe Soap',
    mobile: '27827779988',
    email: 'joe@gmail.com',
}

var contact2 = {
    name: 'Ginger Bread',
    mobile: '2783667300',
    email: 'gingerb@gmail.com',
}

var evanLogin = {
    name: 'Evan B. Summers',
    email: 'evan.summers@gmail.com',
    picture: '',
    totpSecret: '',
    totpUrl: '',
    qr: '',
    contacts: ['Ginger', 'Harry', 'Ian', 'Jenny']
}

var evanLogout = {
    email: 'evan.summers@gmail.com'
}

var bizOrg = {
    orgId: 1,
    orgUrl: 'biz.net',
    orgCode: 'biz',
    displayName: 'Biz (Pty) Ltd',
    region: 'Western Cape',
    locality: 'Cape Town',
    country: 'South Africa'
}

var otherOrg = {
    orgId: 2,
    orgUrl: 'other.net',
    orgCode: 'other',
    displayName: 'The Other Company (Pty) Ltd',
    region: 'Western Cape',
    locality: 'Cape Town',
    country: 'South Africa'    
}

var orgList = {
    list: [bizOrg, otherOrg]
}

var hetznerNetwork = {
    networkName: 'hetzner',
    displayName: 'Hetzner CT1 DC',
    address: '192.168.1.0/24'
}

var biz1Host = {
    hostName: 'biz1',
    ip: '192.168.1.1'
}

var biz1RootClient = {
    hostName: 'biz1',
    clientName: 'root',
    certSubject: 'CN=root@biz1, O=biz, OU=biz1, S=local, L=Cape Town, C=za'
}

var biz1RootNightlyService = {
    hostName: 'biz1',
    clientName: 'root',
    serviceName: 'nightly',
    status: 'OK',
    reportTime: '2013-01-01 01:01:01'
}

function mockRes(req) {
    if (req.url == '/googleLogin') {
        return evanLogin;
    } else if (req.url == '/personaLogin') {
        return evanLogin;
    } else if (req.url == '/logout') {
        return evanLogout;
    } else if (req.url == '/contactEdit') {
        return contact1;
    } else if (req.url == '/contactAdd') {
        return contact2;
    } else if (req.url == '/contactList') {
        return [contact1, contact2];
    }
    return {
        error: 'mockRes ' + req.url
    }
}

