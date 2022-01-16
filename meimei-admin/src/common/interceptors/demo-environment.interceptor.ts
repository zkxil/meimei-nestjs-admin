/*
 * @Author: Sheng.Jiang
 * @Date: 2022-01-16 14:18:32
 * @LastEditTime: 2022-01-16 16:28:58
 * @LastEditors: Sheng.Jiang
 * @Description: 演示环境的拦截器。   如果是演示环境，只放过get请求或者登陆请求进入方法体。
 * @FilePath: \meimei-admin\src\common\interceptors\demo-environment.interceptor.ts
 * You can you up，no can no bb！！
 */


import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { ApiException } from '../exceptions/api.exception';

@Injectable()
export class DemoEnvironmentInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) { }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest()
    const isDemoEnvironment = this.configService.get<Boolean>('isDemoEnvironment')
    if (isDemoEnvironment) {
      if (request.method.toLocaleLowerCase() != 'get' && request.url != "/login")
        throw new ApiException('演示环境,不允许操作')
    }
    return next
      .handle()
  }
}
