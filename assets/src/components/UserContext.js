import React from 'react';

const UserContext = React.createContext({ user: {}, updateUser: () => {} });

export default UserContext;
