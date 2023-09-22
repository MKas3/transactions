// import {
//   BadRequestException,
//   CanActivate,
//   ExecutionContext,
// } from '@nestjs/common';
//
// export class AuthorGuard implements CanActivate {
//   async canActivate(context: ExecutionContext) {
//     const request = context.switchToHttp().getRequest();
//     const { id, type } = request.params;
//
//     let entity;
//
//     switch (type) {
//       case 'transactions':
//         break;
//       case 'category':
//         break;
//       default:
//         throw new BadRequestException('');
//     }
//
//     return true;
//   }
// }
