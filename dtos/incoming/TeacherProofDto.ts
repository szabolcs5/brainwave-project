import { ArrayMinSize, IsArray, IsString } from 'class-validator'
import { IsDocumentUrl } from '../../validators/IsDocument'

export class TeacherProofDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @IsDocumentUrl({ message: 'Proof must be a valid url to a pdf file' })
  proofs!: string[]

  constructor({ proofs }: TeacherProofDto) {
    this.proofs = proofs
  }
}
