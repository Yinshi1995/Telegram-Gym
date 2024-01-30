import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { UserService } from "./user.service";

@Resolver("User")
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query("user")
  async getUser(@Args("telegram_id") telegramId: number) {
    return this.userService.findOne(telegramId);
  }

  @Query("allUsers")
  async getAllUsers() {
    return this.userService.findAll();
  }

  @Mutation("createUser")
  async createUser(@Args("input") userInput: any) {
    return this.userService.create(userInput);
  }
}
