import { Injectable } from "@nestjs/common";
import { Scenes } from "telegraf";
import { RegistrationService } from "./registration.service";

@Injectable()
export class WizardService {
  stage: Scenes.Stage<
    Scenes.WizardContext<Scenes.WizardSessionData>,
    Scenes.SceneSessionData
  >;
  constructor(private readonly registrationService: RegistrationService) {
    const registerWizard = new Scenes.WizardScene(
      "register-wizard",
      this.registrationService.wizard_init,
      this.registrationService.wizard_phone,
      this.registrationService.wizard_birth_date,
      this.registrationService.wizard_height,
      this.registrationService.wizard_weight,
      this.registrationService.wizard_end,
    );

    this.stage = new Scenes.Stage<Scenes.WizardContext>([registerWizard], {});
  }

  public getStage() {
    return this.stage;
  }
}
