import {ITeamMemberInfo} from "../interface";

export const MOCK_TEAM_MEMBERS: ITeamMemberInfo[] = [
    {
        userId: '1',
        id: '1',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'John',
        lastName: 'Doe22',
        email: '11ddd@gmp.opop',
        role: 'admin',
        lastActive: new Date().toUTCString(),
    },{
        userId: '2',
        id: '2',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'John',
        lastName: 'Doe223233',
        email: 'we2323@gmp.opop',
        role: 'admin',
        lastActive: new Date().toUTCString(),
    }, {
        userId: '23swd',
        id: '23swd',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'John',
        lastName: 'Doe3',
        email: 'rwdddfe@gmp.opop',
        role: 'admin',
        lastActive: new Date('2023').toUTCString(),
    },{
        userId: 'werwd',
        id: 'werwd',
        avatar: 'https://www.w3schools.com/howto/img_avatar.png',
        firstName: 'John',
        lastName: '333',
        email: '222ddd@gmp.opop',
        role: 'admin',
        lastActive: new Date('2023-12-12').toUTCString(),
    }
]
