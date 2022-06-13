import { Controller } from '../../../../../presentation/protocols'
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const validation = makeAddSurveyValidation()
  const dbSurvey = makeDbAddSurvey()
  const controller = new AddSurveyController(dbSurvey, validation)
  return makeLogControllerDecorator(controller)
}
