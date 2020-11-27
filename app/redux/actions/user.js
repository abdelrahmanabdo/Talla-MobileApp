
export const loginUser = () => {
   return ({
      type: 'LOGIN',
   })
};

export const logoutUser = () => ({
   type: 'LOGOUT',
 });


export const getUser = () => ({
   type : 'GET_USER'
})