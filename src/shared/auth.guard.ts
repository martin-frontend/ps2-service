import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  // 實作CanActive介面
  canActivate(
    context: ExecutionContext, // 可以取得對應controller及request/request資訊
  ): boolean | Promise<boolean> | Observable<boolean> {
    //回傳boolean型別，支援非同步
    // 驗證邏輯
    const request = context.switchToHttp().getRequest();
    return true;
  }
}
