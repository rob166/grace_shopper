

const createUser = async({username,password})=>{
    try {
      const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
      const { rows: [user] } = await client.query(`
        INSERT
        INTO
        users(username,password)
        VALUES($1,$2) 
        ON CONFLICT (username) DO NOTHING 
        RETURNING *;`, [username,hashedPassword]);
      if(user){
      delete user.password
      return user;
      }else{
        console.error('name aleady used')
      }
    } catch (error) { console.warn(error)}
  }
  
  const editUser =()=>{
    
  }