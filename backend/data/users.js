import bcrypt from 'bcryptjs';

const usersData = [
    {
      email: 'johndoe@example.com',
      password: bcrypt.hashSync("123456",10),
      username: 'JohnDoe',
      proficiencyLevel: {
        en:0,
        fr:0
      },
      
    },
    {
      email: 'janesmith@example.com',
      password: bcrypt.hashSync("123456",10),
      username: 'JaneSmith',
      proficiencyLevel: {
        en:0,
        fr:0
      },
      
    },
    {
      email: 'admin@email.com',
      password: bcrypt.hashSync("123456",10),
      username: 'Admin',
      isAdmin:true,
      proficiencyLevel:{
        en:0,
        fr:0
      },
      
    }
  ]
  

export default usersData