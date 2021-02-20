import {Controller,Post,Body,Get,Param,Patch,Delete,} from '@nestjs/common';
import { QuestionsService } from './Questions.service';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly QuestionsService: QuestionsService) {}

  @Post()
  async addQuestion(
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string,
    @Body('correctOption') correctOption: number,
    @Body('optionA') optionA: string,
    @Body('optionB') optionB: string,
    @Body('optionC') optionC: string,
    @Body('optionD') optionD: string,
  ) {
    const generatedId = await this.QuestionsService.insertQuestion(
      prodTitle,
      prodDesc,
      correctOption,
      optionA,
      optionB,
      optionC,
      optionD
    );
    return { id: generatedId };
  }

  @Get()
  async getAllQuestions() {
    const Questions = await this.QuestionsService.getQuestions();
    return Questions;
  }

  @Get(':id')
  getQuestion(@Param('id') prodId: string) {
    return this.QuestionsService.getSingleQuestion(prodId);
  }

  @Patch(':id')
  async updateQuestion(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDesc: string
  ) {
    await this.QuestionsService.updateQuestion(prodId, prodTitle, prodDesc);
    return null;
  }

  @Delete(':id')
  async removeQuestion(@Param('id') prodId: string) {
      await this.QuestionsService.deleteQuestion(prodId);
      return null;
  }
}
