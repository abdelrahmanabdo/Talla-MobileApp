
export const loginUser = (user, token) => {
   return ({
      type: 'LOGIN',
      user : user,
      token : token
   })
};

export const logoutUser = () => ({
   type: 'LOGOUT',
 });


export const getUser = () => ({
   type : 'GET_USER'
})