import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { PollModule } from './poll/poll.module';
import { PaperModule } from './paper/paper.module';

@Module({
	imports: [
		TypeOrmModule.forRoot(),
		AuthModule,
		AdminModule,
		UserModule,
		PollModule,
		PaperModule
	],
	controllers: [ AppController ],
	providers: [ AppService ]
})
export class AppModule {}
