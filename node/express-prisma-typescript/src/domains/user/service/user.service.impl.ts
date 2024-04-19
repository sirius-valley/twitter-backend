import { NotFoundException } from '@utils/errors'
import { OffsetPagination, CursorPagination } from 'types'
import { UserDTO } from '../dto'
import { UserRepository } from '../repository'
import { UserService } from './user.service'

export class UserServiceImpl implements UserService {
  constructor (private readonly repository: UserRepository) {}

  async getUser (userId: any): Promise<UserDTO> {
    const user = await this.repository.getById(userId)
    if (!user) throw new NotFoundException('user')
    return user
  }

  async getUsersByUsername (username: string, options: CursorPagination): Promise<UserDTO[]> {
    const users = await this.repository.getByUsernamePaginated(username, options)
    return users.map((user) => new UserDTO(user))
  }

  async getUserRecommendations (userId: any, options: OffsetPagination): Promise<UserDTO[]> {
    // TODO: make this return only users followed by users the original user follows
    return await this.repository.getRecommendedUsersPaginated(options)
  }

  async deleteUser (userId: any): Promise<void> {
    await this.repository.delete(userId)
  }
}
