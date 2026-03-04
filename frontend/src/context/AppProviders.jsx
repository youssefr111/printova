import React from "react";
import { RootDataProvider } from "./RootDataContext";
import { AuthProvider } from "./AuthContext";
import { RoleProvider } from "./RoleContext";
import { CartProvider } from "./CartContext";
import { PartProvider } from "./PartContext";
import { ServiceProvider } from "./ServiceContext";
import { OrderProvider } from "./OrderContext";
import { MaintenanceProvider } from "./MaintenanceContext";
import { CategoryProvider } from "./CategoryContext";
import { SupplierProvider } from "./SupplierContext";
import { PartPriceProvider } from "./PartPriceContext";
import { StockProvider } from "./StockContext";
import { PaymentMethodProvider } from "./PaymentMethodContext";
import { PaymentProvider } from "./PaymentContext";

const AppProviders = ({ children }) => (
  <RootDataProvider>
    <AuthProvider>
      <RoleProvider>
        <CategoryProvider>
          <SupplierProvider>
            <ServiceProvider>
              <PartProvider>
                <PartPriceProvider>
                  <StockProvider>
                    <PaymentMethodProvider>
                      <CartProvider>
                        <OrderProvider>
                          <PaymentProvider>
                            <MaintenanceProvider>
                              {children}
                            </MaintenanceProvider>
                          </PaymentProvider>
                        </OrderProvider>
                      </CartProvider>
                    </PaymentMethodProvider>
                  </StockProvider>
                </PartPriceProvider>
              </PartProvider>
            </ServiceProvider>
          </SupplierProvider>
        </CategoryProvider>
      </RoleProvider>
    </AuthProvider>
  </RootDataProvider>
);

export default AppProviders;