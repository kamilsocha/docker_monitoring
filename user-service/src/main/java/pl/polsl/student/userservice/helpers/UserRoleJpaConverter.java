package pl.polsl.student.userservice.helpers;

import pl.polsl.student.userservice.domain.UserRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class UserRoleJpaConverter implements AttributeConverter<UserRole, String> {

    @Override
    public String convertToDatabaseColumn(UserRole attribute) {
        if(attribute == null) return null;
        return attribute.toString();
    }

    @Override
    public UserRole convertToEntityAttribute(String dbData) {
        if(dbData == null) return null;
        try {
            return UserRole.valueOf(dbData);
        } catch (IllegalArgumentException e) {
            return null;
        }
    }
}
