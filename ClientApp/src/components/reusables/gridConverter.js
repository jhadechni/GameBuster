export const rentMapper = (r) => [r.rentId, new Date(r.startDate).toLocaleDateString(), new Date(r.returnDate).toLocaleDateString(), r.price, r.gameId, r.customerId]
export const rentTableColumns = ['Id','Start date','Return date','Price','Game id','Customer id']
export const customerMapper = (c) => [c.customerId, c.cedula, c.name, c.surname , (new Date().getFullYear() - new Date(c.dateOfBirth).getFullYear()), c.address]
export const customerTableColumns = ['Id','Cedula','Name','Surname','Age','Address']