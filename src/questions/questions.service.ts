import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Question } from './question.model';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel('Question') private readonly QuestionModel: Model<Question>,
  ) {}

  async insertQuestion(title: string, desc: string, correctOption: number,
    optionA: string,optionB: string,optionC:string,optionD:string
    ) {
    const newQuestion = new this.QuestionModel({
      title,
      description: desc,
      correctOption,
      optionA,
      optionB,
      optionC,
      optionD
    });
    const result = await newQuestion.save();
    return result.id as string;
  }

  async getQuestions() {
    const Questions = await this.QuestionModel.find().exec();
    return Questions.map(prod => ({
      id: prod.id,
      title: prod.title,
      description: prod.description,
      correctOption: prod.correctOption,
    }));
  }

  async getSingleQuestion(QuestionId: string) {
    const Question = await this.findQuestion(QuestionId);
    return {
      id: Question.id,
      title: Question.title,
      description: Question.description,
      correctOption: Question.correctOption,
    };
  }

  async updateQuestion(
    QuestionId: string,
    title: string,
    desc: string
  ) {
    const updatedQuestion = await this.findQuestion(QuestionId);
    if (title) {
      updatedQuestion.title = title;
    }
    if (desc) {
      updatedQuestion.description = desc;
    }
    updatedQuestion.save();
  }

  async deleteQuestion(prodId: string) {
    const result = await this.QuestionModel.deleteOne({_id: prodId}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find Question.');
    }
  }

  private async findQuestion(id: string): Promise<Question> {
    let Question;
    try {
      Question = await this.QuestionModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find Question.');
    }
    if (!Question) {
      throw new NotFoundException('Could not find Question.');
    }
    return Question;
  }
}
