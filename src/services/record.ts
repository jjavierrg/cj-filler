import { ICJ } from '../core/ICJ';
import { InteractionRecorder } from '../core/InteractionRecorder';

export class RecordService {
  private recordedPlans: ICJ[] = [];
  private interactionRecorder: InteractionRecorder;

  public get RecordedPlans(): ICJ[] {
    return this.recordedPlans;
  }

  public get IsRecordingActive(): boolean {
    return this.interactionRecorder.isRecordingActive;
  }

  constructor() {
    this.interactionRecorder = new InteractionRecorder();
  }

  public excludedFromRecording(elements: HTMLElement[]): void {
    this.interactionRecorder.excludeElements(elements);
  }

  public startRecording(): void {
    this.interactionRecorder.startRecording();
  }

  public stopRecording(): ICJ | null {
    const recordedCJ: ICJ | null = this.interactionRecorder.stopRecording();

    if (recordedCJ) {
      this.recordedPlans.push(recordedCJ);
    }

    return recordedCJ;
  }
}

export const recordService = new RecordService();
