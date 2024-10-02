import { Type } from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';

export class HandlerRegister<T, TypeT extends Type<T> = Type<T>> {
  private handlers = new Map<string, Set<T>>();
  private scopedHandlers = new Map<string, Set<TypeT>>();

  constructor(
    private moduleRef: ModuleRef,
    private metadataKey: any,
  ) {}

  registerHandler(handler: TypeT): boolean {
    const target = this.reflectCommandName(handler);

    if (!target) {
      return false;
    }
    try {
      const instance = this.moduleRef.get(handler, { strict: false });
      if (instance) {
        if (Array.isArray(target)) {
          for (const singleTarget of target) {
            const set = this.handlers.get(singleTarget.name) ?? new Set();
            this.handlers.set(singleTarget.name, set.add(instance));
          }
        } else {
          const set = this.handlers.get(target.name) ?? new Set();
          this.handlers.set(target.name, set.add(instance));
        }
      }
    } catch (error) {
      try {
        this.moduleRef.introspect(handler);
        if (Array.isArray(target)) {
          for (const singleTarget of target) {
            const set = this.scopedHandlers.get(singleTarget.name) ?? new Set();
            this.scopedHandlers.set(singleTarget.name, set.add(handler));
          }
        } else {
          const set = this.scopedHandlers.get(target.name) ?? new Set();
          this.scopedHandlers.set(target.name, set.add(handler));
        }
      } catch {
        return false;
      }
    }

    return true;
  }

  private reflectCommandName(handler: TypeT): FunctionConstructor | FunctionConstructor[] {
    return Reflect.getMetadata(this.metadataKey, handler);
  }

  async get<E>(event: E): Promise<T[] | undefined> {
    const eventName = this.getName(event);

    const singletonHandlers = [...(this.handlers.get(eventName) ?? [])];

    const contextId = ContextIdFactory.create();
    const handlerTypes = this.scopedHandlers.get(eventName);
    if (!handlerTypes) return singletonHandlers;
    const scopedHandlers = await Promise.all(
      [...handlerTypes.values()].map((handlerType) =>
        this.moduleRef.resolve(handlerType, contextId, {
          strict: false,
        }),
      ),
    );

    return [...singletonHandlers, ...scopedHandlers];
  }

  getName<E>(event: E): string {
    const { constructor } = Object.getPrototypeOf(event);
    return constructor.name as string;
  }
}
