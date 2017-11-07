
/**
 * Validate project name
 * @param value the project name to test
 * @returns string if the project name is valid, the error message otherwise
 */
export function validateProjectName(value) {
    // a project name is a project name for which the folder does not exist,
    // for which the name is no blank/undefined or contains spaces

    if (typeof value === 'undefined' || value === '') {
        return 'Name cannot be empty';
    } else if(value.indexOf(' ') !== -1) {
        return 'Name cannot contain spaces'
    }

    return true;
}

/**
 * Validate email string
 * @param value the email to test
 * @returns true if the email name is valid, the error message otherwise
 */
export function validateEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(value)){
        return true;
    }

    return 'Please enter a valid Email';
}

/**
 * Validate username
 * @param value the username to test
 * @returns true if the username name is valid, the error message otherwise
 */
export function validateUsername(value) {
    if (value.length < 1) {
        return 'Username cannot be empty';
    }
    return true;
}

/**
 * Validate password string to match length 8 and contains a number
 * @param value the email to test
 * @returns true if the email name is valid, the error message otherwise
 */
export function validatePassword(value) {
    var noNum = !(value.match(/\d+/g));
    var noAlph = !(value.match(/[a-zA-Z]+/g));
    var tooShort = value.length < 8;
    if(noNum || noAlph || tooShort) {
        return 'Password must be more than 8 characters and contain at least one letter and number';
    }

    return true;
}

/**
 * Validates version numbers. Version numbers must follow the format (number) (.number)*.
 * @param value the version number to test
 * @returns true, if the version is valid, the error message otherwise
 */
export function validateVersionNumber(value) {
    if (/^(\d+\.)?(\d+\.)?(\*|\d+)/.test(value)) {
        return true;
    }

    return 'Invalid version number!';
}

export function validateProjectConfigurations(input) {
    const errors = [];
    if (input.projectConfigurations === 'undefined' || input.tooling === 'undefined') {
        errors.push('Invalid configuration file format.');
    }


    if (typeof input.projectConfigurations.projectName === 'undefined') {
        errors.push('Project Name does not exist!');
    } else {
        const validateResult = validateProjectName(input.projectConfigurations.projectName);
        if (validateResult !== true) {
            errors.push(validateResult);
        }
    }

    if (typeof input.projectConfigurations.description === 'undefined') {
        errors.push('Project Description does not exist!');
    }

    if (typeof input.projectConfigurations.version !== 'undefined') {
        const validateResult = validateProjectName(input.projectConfigurations.version);
        if (validateResult !== true) {
            errors.push(validateResult);
        }
    }

    if (typeof input.tooling.sourceControl === 'undefined') {
        errors.push('Source Control choice does not exist!');
    } else if (!sourceControlChoices.choices.includes(input.tooling.sourceControl)) {
        errors.push(`Invalid source control choice. Valid choices are ${sourceControlChoices.choices}.`);
    } else if (input.tooling.sourceControl === sourceControlChoices.none) {
        if (input.tooling.ci !== ciChoices.none) {
            errors.push('If source control choice is <None>, CI choice must be <None>');
        }

        if (input.tooling.containerization !== containerizationChoices.none) {
            errors.push('If source control choice is <None>, container choice must be <None>');
        }

        if (input.tooling.deployment !== deploymentChoices.none) {
            errors.push('If source control choice is <None>, deployment choice must be <None>');
        }
    }


    if (typeof input.tooling.ci === 'undefined') {
        errors.push('CI choice does not exist!');
    } else if (!ciChoices.choices.includes(input.tooling.ci)) {
        errors.push(`Invalid CI choice. Valid choices are ${ciChoices.choices}.`);
    } else if (input.tooling.ci === ciChoices.none) {
        if (input.tooling.containerization !== containerizationChoices.none) {
            errors.push('If ci choice is <None>, container choice must be <None>');
        }

        if (input.tooling.deployment !== deploymentChoices.none) {
            errors.push('If ci choice is <None>, deployment choice must be <None>');
        }
    }

    if (typeof input.tooling.containerization === 'undefined') {
        errors.push('Container choice does not exist!');
    } else if (!containerizationChoices.choices.includes(input.tooling.containerization)) {
        errors.push(`Invalid container choice. Valid choices are ${containerizationChoices.choices}`);
    } else if (input.tooling.containerization === containerizationChoices.none) {
        if (input.tooling.deployment !== deploymentChoices.none) {
            errors.push('If container choice is <None>, deployment choice must be <None>');
        }
    }

    if (typeof input.tooling.deployment === 'undefined') {
        errors.push('Deployment choice does not exist!');
    } else if (!deploymentChoices.choices.includes(input.tooling.deployment)) {
        errors.push(`Invalid deployment choice. Valid choices are ${deploymentChoices.choices}`);
    }

    if (typeof input.tooling.web === 'undefined') {
        errors.push('Web framework choice does not exist!');
    } else if (!webChoices.choices.includes(input.tooling.web)) {
        errors.push(`Invalid web framework choice. Valid choices are ${webChoices.choices}`);
    }

    return errors;
}