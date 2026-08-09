var P = require('@prisma/client');
var p = new P.PrismaClient();
p.user.findMany({ select: { phoneNumber: true, role: true, isActive: true, passwordHash: true } })
  .then(function(u) {
    u.forEach(function(x) {
      console.log('phone=' + x.phoneNumber + ' role=' + x.role + ' active=' + x.isActive + ' hasHash=' + (x.passwordHash !== null));
    });
    return p['$disconnect']();
  })
  .catch(function(e) {
    console.error('ERROR:', e.message);
    p['$disconnect']();
  });
