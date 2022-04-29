import {ContainerService as Base} from '../../service'

/**
 * Peer service interface
 *
 * @public
 */
export interface Service extends Base {
  [key: string]: any

  /**
   * Write profile to filesystem
   *
   * @public
   */
  writeProfile(): Promise<any>
}