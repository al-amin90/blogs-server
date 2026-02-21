import { ObjectId, Query, Types } from 'mongoose'
import { TBlog } from '../modules/blog/blog.interface'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchableFields: string[]) {
    const search = this.query.search

    if (search) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields?.map(field => ({
          [field]: { $regex: search, $options: 'i' },
        })),
      })
    }

    return this
  }

  filter() {
    const queryObj = { ...this.query }
    const filter: Partial<Pick<TBlog, 'author'>> = {}

    const excludeFields = ['search', 'sortBy', 'limit', 'page', 'selects']
    excludeFields.forEach(el => delete queryObj[el])

    if (this.query.filter) {
      filter.author = new Types.ObjectId(queryObj.filter as string)
    }

    this.modelQuery = this.modelQuery.find(filter)
    return this
  }

  sort() {
    const sortBy = this?.query?.sortBy || `createdAt`
    const sortOrder = this?.query?.sortOrder === 'asc' ? 1 : -1

    this.modelQuery = this.modelQuery.sort({
      [sortBy as string]: sortOrder,
    })
    return this
  }

  paginate() {
    const limit = Number(this?.query?.limit) || 1
    const page = Number(this?.query?.page) || 1
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }

  fields() {
    const selects =
      (this?.query?.selects as string)?.split(',').join(' ') || '-__v'

    this.modelQuery = this.modelQuery.select(selects)
    return this
  }
}

export default QueryBuilder
