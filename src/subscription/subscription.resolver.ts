import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { SubscriptionService } from "./subscription.service";

@Resolver("Subscription")
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Query("subscription")
  async getSubscription(@Args("subscription_id") subscriptionId: number) {
    return this.subscriptionService.findOne(subscriptionId);
  }

  @Query("allSubscriptions")
  async getAllSubscriptions() {
    return this.subscriptionService.findAll();
  }

  @Mutation("createSubscription")
  async createSubscription(@Args("input") input: any) {
    return this.subscriptionService.create(input);
  }
}
