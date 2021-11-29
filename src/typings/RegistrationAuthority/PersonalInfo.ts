import { BaseObject } from "../BaseObject";

/**
 * The `PersonalInfo` data structure contains the user info needed to be compared with the ID document.
 */
interface IPersonalInfo {
    /**
     * The user’s first name. Only one first name must be provided.
     */
    firstname: string;
    /**
     * The user’s last name.
     */
    lastname: string;
    /**
     * The user’s birthdate.
     */
    birthDate: Date;
}

/**
 * Class representing a {@link IPersonalInfo}.
 */
export class PersonalInfo extends BaseObject<IPersonalInfo> {
    /**
     * Create a new instance of a `PersonalInfo`.
     * @constructor
     * @param {IPersonalInfo} personalInfo
     */
    constructor(personalInfo: IPersonalInfo) {
        super(personalInfo);
    }
}
